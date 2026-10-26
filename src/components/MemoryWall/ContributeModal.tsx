import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { X, ArrowRight } from "lucide-react";
import ThemedButton from "../ui/ThemedButton";
import { compressImage } from "../../utils/compressImage";

export type ContributePayload = {
  name: string;
  email: string;
  message: string;
  photos: string[];
};

type ContributeModalProps = {
  onClose: () => void;
  onSubmit: (data: ContributePayload) => void;
};

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const labelClass = "mb-2 block text-[15px] font-semibold text-[color:var(--page-color)]";
const fieldClass =
  "w-full rounded-lg border border-[color:var(--page-color)] bg-white px-4 text-sm text-black outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[color:var(--page-color)]";

export default function ContributeModal({ onClose, onSubmit }: ContributeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const valid = files.filter((f) => f.type.startsWith("image/") && f.size <= MAX_FILE_SIZE);
    const allowed = valid.slice(0, MAX_PHOTOS - photos.length);

    if (valid.length !== files.length) {
      setError("Only image files up to 5 MB can be added.");
    } else if (allowed.length < valid.length) {
      setError(`You can add up to ${MAX_PHOTOS} images.`);
    } else {
      setError("");
    }

    try {
      const added = await Promise.all(allowed.map((f) => compressImage(f, 800, 0.7)));
      setPhotos((prev) => [...prev, ...added]);
    } catch {
      setError("Could not load an image. Please try another one.");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return setError("Please write your message first.");
    onSubmit({
      name: name.trim() || "Anonymous",
      email: email.trim(),
      message: message.trim(),
      photos,
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="contribute-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-[800px] rounded bg-white font-normal text-black shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h3
            id="contribute-title"
            className="text-[28px] font-normal text-[color:var(--page-color)]"
          >
            Contribute
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer p-1 text-neutral-700 hover:bg-neutral-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelClass}>
                Your Name
              </label>
              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                maxLength={40}
                className={`h-[40px] ${fieldClass}`}
              />
            </div>

            <div>
              <label htmlFor="c-email" className={labelClass}>
                Your Email
              </label>
              <input
                id="c-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className={`h-[40px] ${fieldClass}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-message" className={labelClass}>
              Your Message
            </label>
            <textarea
              id="c-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your Message"
              className={`h-[110px] resize-y py-3 ${fieldClass}`}
            />
          </div>

          <div>
            <span className={labelClass}>Your Images</span>

            <ThemedButton
              size="md"
              onClick={() => fileRef.current?.click()}
              disabled={photos.length >= MAX_PHOTOS}
              className="gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Image
              <ArrowRight size={16} />
            </ThemedButton>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onFilesChange}
            />

            {photos.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3">
                {photos.map((src, i) => (
                  <li key={i} className="relative h-16 w-16 border border-neutral-300">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                      aria-label="Remove image"
                      className="absolute -right-2 -top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                    >
                      <X size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-neutral-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-[44px] cursor-pointer border border-black bg-white px-6 text-sm text-black hover:bg-neutral-100"
          >
            Cancel
          </button>
          <ThemedButton size="md" type="submit">
            Submit
          </ThemedButton>
        </div>
      </form>
    </div>
  );
}