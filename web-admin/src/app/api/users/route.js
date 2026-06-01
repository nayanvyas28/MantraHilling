import { getAdminClient } from "../../../lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const adminClient = getAdminClient();
    
    // 1. Fetch from profiles table
    const { data: dbProfiles, error: dbError } = await adminClient
      .from("profiles")
      .select("*")
      .order("email");
      
    if (dbError) throw dbError;
    
    // 2. Fetch from auth.users (requires service role key)
    const { data: authData, error: authError } = await adminClient.auth.admin.listUsers();
    if (authError) {
      console.warn("Auth listUsers error (non-fatal):", authError.message);
    }
    
    const authUsers = authData?.users || [];
    
    // Merge database profiles with Auth metadata
    const merged = (dbProfiles || []).map(profile => {
      const authUser = authUsers.find(u => u.id === profile.id);
      return {
        ...profile,
        // fields from auth.users
        email_confirmed_at: authUser?.email_confirmed_at || null,
        last_sign_in_at: authUser?.last_sign_in_at || null,
        created_at: authUser?.created_at || profile.created_at || null,
        is_verified: !!(authUser?.email_confirmed_at || authUser?.confirmed_at),
      };
    });
    
    return NextResponse.json({ success: true, users: merged });
  } catch (error) {
    console.error("API /api/users GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { action, userId, data } = await request.json();

    if (!action || !userId) {
      return NextResponse.json({ error: "Action and userId are required." }, { status: 400 });
    }

    const adminClient = getAdminClient();

    if (action === "update") {
      // Update in profiles table
      const { data: updatedProfile, error: updateError } = await adminClient
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)
        .select()
        .single();

      if (updateError) throw updateError;
      return NextResponse.json({ success: true, data: updatedProfile });
      
    } else if (action === "verify") {
      // Confirm user email/verification in Supabase Auth
      const { data: updatedAuthUser, error: authError } = await adminClient.auth.admin.updateUserById(
        userId,
        { email_confirm: true }
      );

      if (authError) throw authError;
      return NextResponse.json({ success: true, data: updatedAuthUser });

    } else if (action === "delete") {
      // 1. Delete from profiles table
      const { error: dbError } = await adminClient
        .from("profiles")
        .delete()
        .eq("id", userId);
        
      if (dbError) console.warn("Error deleting from profiles (non-fatal):", dbError.message);

      // 2. Delete from Supabase Auth
      const { error: authError } = await adminClient.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      return NextResponse.json({ success: true, message: "User deleted successfully from auth and profile records." });

    } else {
      return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error(`API /api/users POST Error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
