import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  addTeamMember,
  updateTeamMember,
  getTeamMemberById,
} from "@/lib/firebaseService";
import { uploadToCloudinary } from "@/lib/cloudinaryService";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [order, setOrder] = useState(0);
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const member = await getTeamMemberById(id);
      if (!member) {
        navigate("/admin/team");
        return;
      }
      setName(member.name);
      setRole(member.role);
      setOrder(member.order);
      setImage(member.image || "");
      setGithub(member.github || "");
      setLinkedin(member.linkedin || "");
      setFetching(false);
    })();
  }, [id, navigate]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, "team");
      setImage(result.secure_url);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const memberData = {
      name,
      role,
      order,
      ...(image ? { image } : {}),
      ...(github ? { github } : {}),
      ...(linkedin ? { linkedin } : {}),
    };

    try {
      if (isEdit) {
        await updateTeamMember(id, memberData);
      } else {
        await addTeamMember(memberData as any);
      }
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      navigate("/admin/team");
    } catch {
      toast.error("Failed to save team member");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Team Member" : "New Team Member"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit
              ? "Update team member details"
              : "Add a new member to the team"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="brutal-card p-6 space-y-4">
            {/* Profile image */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full border-[3px] border-foreground bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold overflow-hidden flex-shrink-0">
                {image ? (
                  <img
                    src={image}
                    alt={name || "Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : name ? (
                  name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                ) : (
                  "?"
                )}
              </div>
              <div className="space-y-2">
                <label className="brutal-btn bg-muted text-foreground cursor-pointer flex items-center gap-2 !px-4 !py-2 text-sm">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </label>
                {uploading && (
                  <p className="text-xs text-muted-foreground">Uploading...</p>
                )}
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border-[2px] border-foreground/30 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Or paste image URL"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ahmed Hassan"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Role *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="President"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lower numbers appear first
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="brutal-btn bg-primary text-primary-foreground flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : null}
              {isEdit ? "Update Member" : "Add Member"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/team")}
              className="brutal-btn bg-muted text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default TeamForm;
