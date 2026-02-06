import { Title, Button, Card, CardContent, Accordion, AccordionContent, AccordionItem } from "@/components/ui";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { useNavigate } from "react-router-dom";

export default function Solution() {
  const navigate = useNavigate();
  return (
    <div>
      <Title variant="navy" size="medium">Ứng phó rủi ro</Title>
      <Card className="bg-(--white) shadow-sm border-none">
        <CardContent className="flex flex-col items-center p-8 space-y-4">
          <Accordion type="multiple" className="w-full space-y-4 my-4">
            <AccordionItem value="">
              <AccordionTrigger>

              </AccordionTrigger>
              <AccordionContent>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
        <div className="py-4 flex gap-2 justify-end sticky bottom-0  backdrop-blur p-4 border-t mt-4">
          <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/projects/evaluation')}
              >
            Quay lại
          </Button>
          <Button
            type="submit"
            variant="primary"
            size='medium'
            >
            Tiếp theo
          </Button>
        </div>
    </div>
  )
}
