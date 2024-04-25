import Columns from "@/components/Columns";
import Image from "next/image";

export default function Home() {
      return (
       <section className="flex h-screen bg-gradient-to-br from-gray-700 to-gray-400 pt-4">
        <div className="mx-auto w-full max-w-7xl px-6">
          <Columns />
        </div>
       </section>
     
    
  );
}
