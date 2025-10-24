import {redirect} from "next/navigation";
import {getUserSession} from "@/shared/lib/get-user-session";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p>This is the profile page content.</p>
    </div>
  );
}