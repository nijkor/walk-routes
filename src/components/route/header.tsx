"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { CameraIcon, ImageOffIcon, MapIcon } from "lucide-react";

// Части хедера
import { Info } from "./info";
import { Map } from "./map";
import { Photos } from "./photos";

export function Header() {
  const [showMap, setShowMap] = useState<boolean>(true);

  const toggleMap = () => setShowMap((prev) => !prev);

  return (
    <div className="relative w-full h-160 rounded-t-4xl overflow-hidden">
      <Button
        className="z-50 absolute top-3.5 right-3.5 rounded-full px-4"
        size="sm"
        onClick={toggleMap}
      >
        {!showMap ? (
          <>
            <MapIcon />
            показать карту
          </>
        ) : (
          <>
            <CameraIcon />
            показать фотографии
          </>
        )}
      </Button>

      {showMap ? (
        <>
          <Map />
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        </>
      ) : (
        <Photos />
      )}

      <Info />
    </div>
  );
}
