"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import ModelsTable from "../ModelsTable";
import ClearModels from "../ClearModels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 0;

type ClientSideModelsListProps = {
  serverModels: modelRowWithSamples[] | [];
};

export default function ClientSideModelsList({
  serverModels,
}: ClientSideModelsListProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const [models, setModels] = useState<modelRowWithSamples[]>(serverModels);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-models")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "models" },
        async (payload: any) => {
          const samples = await supabase
            .from("samples")
            .select("*")
            .eq("modelId", payload.new.id);

          const newModel: modelRowWithSamples = {
            ...payload.new,
            samples: samples.data,
          };

          const dedupedModels = models.filter(
            (model) => model.id !== payload.old?.id
          );

          setModels([...dedupedModels, newModel]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, models, setModels]);

  const handleDeleteModels = () => {
    setModels([]);
  };

  return (
    <div className="container mx-auto mt-14 mb-2 px-4">
      {models && models.length > 0 ? (
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-medium tracking-wide text-slate-700">
                Your Models
              </CardTitle>
              <div className="flex space-x-2">
                <ClearModels onClear={handleDeleteModels} />
                <Link href="/overview/models/train" className="w-fit">
                  <Button size="sm" variant="default">
                    Train model
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ModelsTable models={models} />
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white shadow-md rounded-lg overflow-hidden text-center p-12">
          <CardContent className="flex flex-col items-center space-y-6">
            <FaUserPlus size={50} className="text-blue-500" />
            <CardTitle className="text-2xl font-medium tracking-wide text-slate-700">
              Train your AI model
            </CardTitle>
            <Link href="/overview/models/train">
              <Button size="lg">Train model</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
