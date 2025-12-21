'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";

import {
    CameraOffIcon,
    Trash2Icon,
    UploadIcon
} from "lucide-react";

type Props = {
    photos: File[];
    setPhotos: React.Dispatch<React.SetStateAction<File[]>>
}

function PhotoTile({
    file,
    onRemove,
}: {
    file: File;
    onRemove: () => void;
}) {
    const [src, setSrc] = useState<string>("");

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setSrc(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    return (
        <div className="relative overflow-hidden rounded-lg bg-muted/30">
            <div className="aspect-square">
                {src.length > 0 ? (
                    <Image
                        src={src}
                        alt={file.name}
                        className="h-full w-full object-cover"
                        draggable={false}
                        fill
                    />
                ) : null}
            </div>

            <Button
                size="icon-sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={onRemove}
            >
                <Trash2Icon />
            </Button>
        </div>
    );
}

// Сетка фотографий
function PhotosGrid({ photos, setPhotos }: Props) {
    const removePhoto = (index: number) =>
        setPhotos((prev) => prev.filter((_, i) => i !== index));

    if (photos.length === 0) {
        return (
            <Empty className="bg-muted/30">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <CameraOffIcon />
                    </EmptyMedia>
                    <EmptyTitle>Не добавлено ни одной фотографии</EmptyTitle>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div
            className="
        grid gap-2
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      "
        >
            {photos.map((file, i) => (
                <PhotoTile
                    key={`${file.name}-${file.lastModified}-${i}`}
                    file={file}
                    onRemove={() => removePhoto(i)}
                />
            ))}
        </div>
    );
}


// Загружает фотографию
function AddPhoto({ setPhotos }: Pick<Props, "setPhotos">) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length === 0) return;

        const allowed = new Set(["image/jpeg", "image/png"]);
        const validFiles = files.filter((f) => allowed.has(f.type));

        if (validFiles.length > 0) {
            setPhotos((prev) => [...prev, ...validFiles]);
        }

        e.target.value = "";
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={onFileChange}
                style={{ display: "none" }}
            />

            <Button type="button" onClick={openFileDialog}>
                <UploadIcon className="mr-2 h-4 w-4" />
                Загрузить фотографию
            </Button>
        </>
    );
}

export function Photos({ photos, setPhotos }: Props) {
    return (
        <div className="space-y-3">
            <PhotosGrid photos={photos} setPhotos={setPhotos} />
            <AddPhoto setPhotos={setPhotos} />
        </div>
    );
}
