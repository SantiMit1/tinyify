import { useState } from "react";

interface Props {
  slug: string;
  url: string;
  urlId: string;
  description: string;
}

const Card: React.FC = ({ slug, url, urlId, description }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(`https://tinyify.vercel.app/s/${slug}`);
  }

  function deleteUrl() {
    fetch(`/api/urls/delete/${urlId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  }

  return (
    <div className="border border-slate-900 p-4 m-4 relative flex flex-col items-start justify-center rounded">
      <a
        href={`/s/${slug}`}
        className="text-xl font-semibold hover:underline mb-1"
      >
        /s/{slug}
      </a>
      <span className="text-gray-400">{url}</span>
      <p className="text-gray-300">{description}</p>
      <button
        className="text-gray-400 hover:text-white transition absolute top-1 right-6 text-3xl"
        onClick={() => setShowMenu(!showMenu)}
      >
        ...
      </button>
      <div
        className={`${
          showMenu ? "block fade-in-dropdown" : "hidden fade-out-dropdown"
        } flex flex-col bg-slate-900 absolute top-12 right-0 border border-slate-800 rounded-md px-1 py-2`}
      >
        <button
          className="hover:bg-slate-700 py-2 px-6 w-full transition rounded-sm"
          onClick={() => copyToClipboard()}
        >
          Copy
        </button>
        <button
          className="hover:bg-slate-700 py-2 px-6 w-full transition rounded-sm"
          onClick={() => deleteUrl()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
