export default function Line(props: {
  href: string;
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      key={props.key}
      className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 
      transition-colors duration-200 group"
    >
      <div className="flex items-start justify-between">
        <h4 className="font-semibold group-hover:text-violet-400 transition-colors">
          {props.title}
        </h4>
        <span className="text-xs bg-white/5 px-2 py-1 rounded-full">
          {props.subtitle}
        </span>
      </div>
      {props.description && (
        <p className="text-gray-400 text-sm mt-2">{props.description}</p>
      )}
    </a>
  );
}
