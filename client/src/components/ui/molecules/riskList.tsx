import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Button from "../button";
import Input from "../input";
import { Title } from "../title";
import type { RiskResponse } from "@/types/risk.type";
import { useCreateRisk, useDeleteRisk, useUpdateRisk } from "@/hooks/useRisk";

interface ListRiskProps {
  projectId: string | number;
  objectiveId: string | number;
  risks: RiskResponse[];
}

export default function RiskList({ projectId, objectiveId, risks = [] }: ListRiskProps) {
  const [tempRiskName, setTempRiskName] = useState("");
  const createRisk = useCreateRisk(projectId);
  const updateRisk = useUpdateRisk(projectId);
  const deleteRisk = useDeleteRisk(projectId);

  const handleQuickAdd = () => {
    if (!tempRiskName.trim()) return;
    createRisk.mutate({ objectiveId, body: { name: tempRiskName } });
    setTempRiskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleQuickAdd();
    }
  };

  return (
    <div className="p-4 bg-(--secondary-btn) rounded-lg">
      <div className="flex gap-2 py-2">
        <Input 
          placeholder="Nhập tên rủi ro rồi ấn Enter..." 
          className="bg-(--secondary-btn) border-(--blue-border) focus:bg-(--white) transition-colors"
          value={tempRiskName}
          onChange={(e) => setTempRiskName(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={createRisk.isPending}
        />
        <Button
          type="button"
          onClick={handleQuickAdd}
          variant="none"
          size="none"
          disabled={createRisk.isPending}
        >
          <Plus className="h-6 w-6"/>
        </Button>
      </div>

      <Title variant="dark" size="small" className="text-start mt-2">Danh sách rủi ro</Title>
      
      {risks.map((risk) => (
        <div key={risk.id} className="flex gap-2 items-center py-2">
          <Input 
            defaultValue={risk.name} 
            className="bg-(--secondary-btn) border-(--blue-border) w-full" 
            onBlur={(e) => {
              const newName = e.target.value.trim();
              if (newName && newName !== risk.name) {
                updateRisk.mutate({ riskId: risk.id, body: { name: newName } });
              }
            }}
          />
          <button
            type="button"
            onClick={() => deleteRisk.mutate(risk.id)}
            disabled={deleteRisk.isPending}
          >
            <Trash2 className="h-6 w-6 text-(--error) cursor-pointer hover:bg-(--secondary-btn) rounded-md transition"/>
          </button>
        </div>
      ))}

      {risks.length === 0 && (
        <div className="text-center py-4 bg-(--secondary-btn) rounded border border-dashed border-(--blue-border) mt-2">
          <p className="text-xs text-(--description) italic">Chưa có rủi ro nào. Hãy nhập vào ô bên trên.</p>
        </div>
      )}
    </div>
  );
}
