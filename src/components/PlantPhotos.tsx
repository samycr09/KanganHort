import { useEffect, useState } from 'react';

interface Props {
  images?: string[];
  onChange?: (images: string[]) => void;
  maxPhotos?: number;
  maxSizeMB?: number;
  uploadProgress?: Record<number, number>;
}

export default function PlantPhotos({ images: initialImages = [], onChange, maxPhotos = 5, maxSizeMB = 5, uploadProgress = {} }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const spaceLeft = Math.max(0, maxPhotos - images.length);
    const toAdd = files.slice(0, spaceLeft);

    const readPromises = toAdd.map((f) => {
      if (!f.type.startsWith('image/')) return Promise.resolve<string | null>(null);
      if (f.size > maxSizeMB * 1024 * 1024) return Promise.resolve<string | null>(null);
      return new Promise<string>((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(String(reader.result));
        reader.onerror = rej;
        reader.readAsDataURL(f);
      });
    });

    const results = await Promise.all(readPromises);
    const valid = results.filter(Boolean) as string[];
    const next = [...images, ...valid].slice(0, maxPhotos);
    setImages(next);
    onChange?.(next);
    e.currentTarget.value = '';
  };

  const removeAt = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    onChange?.(next);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {images.map((src, i) => (
          <div key={i} className="relative rounded overflow-hidden border">
            <img src={src} alt={`plant-${i}`} className="w-full h-28 object-cover" />
            {uploadProgress[i] ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="w-3/4 bg-gray-200 rounded overflow-hidden">
                  <div className="bg-green-600 h-2" style={{ width: `${Math.min(100, Math.round(uploadProgress[i]))}%` }} />
                </div>
                <div className="text-white text-xs ml-2">{Math.round(uploadProgress[i])}%</div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 text-sm"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < maxPhotos && (
          <label className="flex items-center justify-center border border-dashed rounded h-28 cursor-pointer text-sm text-gray-600">
            <input type="file" accept="image/*" multiple onChange={handleSelect} className="hidden" />
            Add photo
          </label>
        )}
      </div>
      <div className="text-sm text-gray-500">{images.length}/{maxPhotos} photos</div>
    </div>
  );
}
