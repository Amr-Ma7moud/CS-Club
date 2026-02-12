import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { toast } from "sonner";
import { deleteTeamMember } from "@/lib/firebaseService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TeamList = () => {
  const { data: teamMembers = [], isLoading } = useTeamMembers();
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from the team? This cannot be undone.`))
      return;
    setDeleting(id);
    try {
      await deleteTeamMember(id);
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    } catch {
      toast.error("Failed to delete team member");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team Members</h1>
            <p className="text-muted-foreground mt-1">
              Manage the team displayed on the About page
            </p>
          </div>
          <Link
            to="/admin/team/new"
            className="brutal-btn bg-primary text-primary-foreground flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="brutal-card p-6 h-44 animate-pulse bg-muted"
              />
            ))}
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="brutal-card p-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">No team members yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first team member
            </p>
            <Link
              to="/admin/team/new"
              className="brutal-btn bg-primary text-primary-foreground inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Member
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="brutal-card p-6 text-center">
                <div className="w-16 h-16 rounded-full border-[3px] border-foreground bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  )}
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Order: {member.order}
                </p>
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/admin/team/${member.id}`}
                    className="brutal-btn bg-muted text-foreground !px-3 !py-1.5 text-xs"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    disabled={deleting === member.id}
                    className="brutal-btn bg-destructive/10 text-destructive !px-3 !py-1.5 text-xs disabled:opacity-50"
                  >
                    {deleting === member.id ? (
                      <div className="animate-spin h-3.5 w-3.5 border-2 border-destructive border-t-transparent rounded-full" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TeamList;
