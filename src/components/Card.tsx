type Props = { title:string; desc:string; badges?:string[] };
export default function Card({ title, desc, badges=[] }:Props){
  return (
    <article className="rounded-xl border p-5 shadow-sm focus-within:ring-4">
      <a href="#" className="block outline-0 focus-visible:ring-4 rounded">
        <h3 className="font-semibold text-xl">{title}</h3>
      </a>
      <p className="text-gray-600 mt-1">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {badges.map((b,i)=>(
          <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded" aria-label={`etiqueta ${b}`}>{b}</span>
        ))}
      </div>
    </article>
  );
}
