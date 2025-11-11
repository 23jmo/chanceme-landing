/**
 * Test page for EssayImportCard component
 * 
 * Simple page to preview and test the EssayImportCard component
 */

"use client";

import EssayImportCard from "@/components/EssayImportCard";

export default function TestEssayCardPage() {
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-8"
      style={{
        backgroundImage: "url('/absbg.png')",
        backgroundPosition: "center",
      }}
    >
      {/* Container with fixed dimensions matching typical card size */}
      <div className="w-full max-w-[900px] h-[500px]">
        <EssayImportCard />
      </div>
    </div>
  );
}





