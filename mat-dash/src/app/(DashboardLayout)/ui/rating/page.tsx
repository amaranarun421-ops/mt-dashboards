"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";

const RatingPage = () => {
  const [rating1, setRating1] = useState(4);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(3);

  return (
    <PageContainer title="Rating" description="Star, heart, and emoji-based rating components.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Star Rating">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((s) => (
                <button key={s} onClick={() => setRating1(s)} className="text-3xl transition-transform hover:scale-110">
                  <Icon icon={s <= rating1 ? "solar:star-bold" : "solar:star-linear"} className={s <= rating1 ? "text-warning" : "text-muted-foreground"} />
                </button>
              ))}
            </div>
            <span className="text-sm opacity-70">{rating1}/5</span>
          </div>
        </DemoBlock>

        <DemoBlock title="Heart Rating">
          <div className="flex gap-1">
            {[1,2,3,4,5].map((s) => (
              <button key={s} onClick={() => setRating2(s)} className="text-2xl transition-transform hover:scale-110">
                <Icon icon={s <= rating2 ? "solar:heart-bold" : "solar:heart-linear"} className={s <= rating2 ? "text-error" : "text-muted-foreground"} />
              </button>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Small Stars (Read-only)">
          <div className="space-y-2">
            {[
              { label: "Excellent", stars: 5 },
              { label: "Very Good", stars: 4 },
              { label: "Good", stars: 3 },
              { label: "Fair", stars: 2 },
              { label: "Poor", stars: 1 },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => <Icon key={s} icon="solar:star-bold" width={14} className={s <= r.stars ? "text-warning" : "text-muted-foreground"} />)}
                </div>
                <span className="text-sm opacity-70">{r.label}</span>
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Emoji Rating">
          <div className="flex gap-2">
            {[
              { icon: "solar:sad-square-bold-duotone", val: 1, color: "error" },
              { icon: "solar:emoji-funny-square-bold-duotone", val: 2, color: "warning" },
              { icon: "solar:emoji-smile-square-bold-duotone", val: 3, color: "info" },
              { icon: "solar:emoji-happy-square-bold-duotone", val: 4, color: "success" },
              { icon: "solar:emoji-laughing-square-bold-duotone", val: 5, color: "primary" },
            ].map((e) => (
              <button key={e.val} onClick={() => setRating3(e.val)} className={`p-2 rounded-lg transition-all ${rating3 === e.val ? `bg-light${e.color} scale-110` : "hover:bg-lightgray dark:hover:bg-dark"}`}>
                <Icon icon={e.icon} width={28} className={rating3 === e.val ? `text-${e.color}` : "text-muted-foreground"} />
              </button>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default RatingPage;
