interface Props {
  slug: string;
  url: string;
  id: string;
  description: string;
}

const Card: React.FC = ({ slug, url, id, description }: Props) => {
  return (
    <div className="border border-slate-900 p-4 m-4 relative flex flex-col items-start justify-center">
      <a href={`/s/${slug}`} className="text-xl font-semibold hover:underline mb-1">
        /s/{slug}
      </a>
      <span className="text-gray-400">{url}</span>
      <p className="text-gray-300">{description}</p>
      <button className="text-gray-400 hover:text-white transition absolute top-1 right-6 text-3xl">
        ...
      </button>
    </div>
  );
};

export default Card;
