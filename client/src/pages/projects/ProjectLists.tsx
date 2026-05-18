import { useState } from "react";
import { PageTransition } from "@/components/animated";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, 
  Title, Badge,
  Button
} from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteProject, useGetProjectsByUserId } from "@/hooks/useProject";
import { Trash2 } from "lucide-react";

export default function ProjectLists() {
  const deleteProject = useDeleteProject();
  const { profile }  = useAuth();
  const user = profile?.data?.data;

  const [filter, setFilter] = useState("ALL"); // "ALL" | "ACTIVE" | "COMPLETED"

  const { data: projects, isPending, isError } = useGetProjectsByUserId(user?.id);

  if (isPending) {
    return <h2 className="p-6 text-center text-(--description)">Đang tải dữ liệu...</h2>
  }

  if (isError) {
    return <h2 className="p-6 text-center text-(--error)">Có lỗi xảy ra vui lòng thử lại!</h2>
  }

  const filteredProjects = projects?.filter(p => {
    if (filter === "COMPLETED") return p.status === "COMPLETED";
    if (filter === "ACTIVE") return p.status !== "COMPLETED";
    return true;
  }) || [];

  const handleDelete = (id: number) => {
    if (deleteProject.isPending) return;
    deleteProject.mutate(id)
  }

  return (
    <PageTransition>
      <Title variant="dark" size="large" className="text-center mb-6">Danh sách dự án</Title>
      
      <div className="flex justify-between items-center mb-6">
        <Title variant="dark" size="small">
          {filter === "ALL" && `Tất cả dự án (${filteredProjects.length})`}
          {filter === "ACTIVE" && `Đang hoạt động (${filteredProjects.length})`}
          {filter === "COMPLETED" && `Đã hoàn thành (${filteredProjects.length})`}
        </Title>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL" className="cursor-pointer bg-(--background) hover:bg-(--primary-foreground)">Tất cả</SelectItem>
            <SelectItem value="ACTIVE" className="cursor-pointer bg-(--background) hover:bg-(--primary-foreground)">Đang hoạt động</SelectItem>
            <SelectItem value="COMPLETED" className="cursor-pointer bg-(--background) hover:bg-(--primary-foreground)">Đã hoàn thành</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên dự án</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium text-start">{project.name}</TableCell>
                  <TableCell className="text-start">
                    <Badge variant={project.status === "COMPLETED" ? "secondary" : "default"}>
                      {project.status === "COMPLETED" ? "Đã hoàn thành" : "Đang hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end">
                    <Button
                      className="rounded-full bg-(--error) text-(--background) hover:bg-(--error)/80"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Không có dự án nào phù hợp.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageTransition>
  )
}
