import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");
  const { user } = session;

  return (
    <div className="container stack-4" style={{ padding: "32px" }}>
      <div className="window">
        <div className="window__titlebar">
          <div className="window__controls">
            <span className="win-dot win-close"></span>
            <span className="win-dot win-min"></span>
            <span className="win-dot win-zoom"></span>
          </div>
          <div className="window__title">Profile</div>
          <div style={{ width: "24px" }}></div>
        </div>
        <div className="window__body">
          <div className="grid-3" style={{ marginTop: "16px" }}>
            <section className="widget" style={{ textAlign: "center" }}>
              <div className="widget__header">Info</div>
              <img
                src={user?.image || "/placeholder.svg"}
                alt={user?.name || "User"}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  margin: "0 auto",
                }}
              />
              <h5 style={{ marginTop: "12px" }}>{user?.name}</h5>
              <p className="muted">{user?.email}</p>
            </section>

            <section className="widget">
              <div className="widget__header">Stats</div>
              <p className="muted">Posts: 0</p>
              <p className="muted">Followers: 0</p>
              <p className="muted">Following: 0</p>
            </section>

            <section className="widget">
              <div className="widget__header">Actions</div>
              <div className="stack-4">
                <Link href="/profile/edit" className="btn btn--primary">
                  Edit Profile
                </Link>
                <Link href="/settings" className="btn btn--ghost">
                  Settings
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
