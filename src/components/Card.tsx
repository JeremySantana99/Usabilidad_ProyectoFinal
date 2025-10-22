type Props = { title:string; desc:string; badges?:string[] };
export default function Card({ title, desc, badges=[] }:Props){
  return (
    <article className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">{desc}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {badges.map((b,i)=>(
          <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded" aria-label={`etiqueta ${b}`}>{b}</span>
        ))}
      </div>
    </article>
  );
}
