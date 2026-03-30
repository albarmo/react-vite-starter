"use client";

import { BibliographicTabContentItem as BiliographyTabContentItem } from "@/features/protected/library/bibliographic/components/bibliographic-tab-content-item";
import { BibliographicTabContentList as BiliographyTabContentList } from "@/features/protected/library/bibliographic/components/bibliographic-tab-content-list";
import { PageContainer } from "@/shared/components/common/app-page-container";
import { AppPageHeader } from "@/shared/components/common/app-page-header";
import { MdUpwardCard } from "@/shared/components/common/md-upward-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useState } from "react";

export function BibliographicListPage() {
  const [activeTab, setActiveTab] = useState("bibliography");

  return (
    <PageContainer className="pb-10">
      <AppPageHeader title="Bibliography List" />

      <MdUpwardCard className="mt-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="max-w-45">
            <TabsTrigger value="bibliography" className="px-2.5">
              Bibliography
            </TabsTrigger>
            <TabsTrigger value="item" className="px-2.5">
              Item
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bibliography" className="pt-5">
            <BiliographyTabContentList />
          </TabsContent>

          <TabsContent value="item" className="pt-5">
            <BiliographyTabContentItem />
          </TabsContent>
        </Tabs>
      </MdUpwardCard>
    </PageContainer>
  );
}
