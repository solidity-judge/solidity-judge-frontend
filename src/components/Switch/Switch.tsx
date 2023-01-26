import React from "react";

export default function Switch({ items }: { items: SwitchItems[] }) {
  const [selectedTab, setSelectedTab] = React.useState(items[0].id);

  return (
    <div className="flex flex-col p-3 border rounded-md">
      <div className="flex flex-row rounded-full border">
        {items.map((item) => (
          <div
            key={item.id}
            className={
              "px-4 py-2 text-center text-sm rounded-full font-medium w-24 hover:cursor-pointer" +
              (selectedTab === item.id ? " bg-indigo-500 text-white" : "")
            }
            onClick={() => setSelectedTab(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {items.find((item) => item.id === selectedTab)?.component}
      </div>
    </div>
  );
}

type SwitchItems = {
  id: string;
  name: string;
  component: React.ReactNode;
};
