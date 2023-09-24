import MainEditor from "@/ui/components/editor/editor";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="overflow-hidden h-full">
      <MainEditor id={params.id}/>
    </div>
  )
}