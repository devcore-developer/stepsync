"use client";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUsers, changeUserRole } from "@/app/actions/admin";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    try {
      await changeUserRole(userId, newRole);
      const updated = await getUsers();
      setUsers(updated);
    } catch (error) {
      alert("Failed to change role");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="User Management" description="View and manage user roles" />
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-muted border-b border-surface-border">
                <tr>
                  <th className="text-left p-3 font-medium text-ink-tertiary">Name</th>
                  <th className="text-left p-3 font-medium text-ink-tertiary">Email</th>
                  <th className="text-left p-3 font-medium text-ink-tertiary">Role</th>
                  <th className="text-left p-3 font-medium text-ink-tertiary">Joined</th>
                  <th className="text-right p-3 font-medium text-ink-tertiary">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-surface-border">
                    <td className="p-3 font-medium text-navy-700">{user.name}</td>
                    <td className="p-3 text-ink-secondary">{user.email}</td>
                    <td className="p-3">
                      <Badge variant={user.role === "ADMIN" ? "red" : "default"}>{user.role}</Badge>
                    </td>
                    <td className="p-3 text-ink-secondary">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <Button size="sm" variant="outline" onClick={() => handleRoleChange(user.id, user.role)}>
                        {user.role === "ADMIN" ? "Demote" : "Promote"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}