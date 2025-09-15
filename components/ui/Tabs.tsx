import React from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

const Tabs = ({ children, defaultValue }: { children: React.ReactNode; defaultValue: string; }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn("af-inline-flex af-h-auto af-items-center af-justify-center af-rounded-lg af-bg-surface af-p-1 af-text-text-lo af-border af-border-line", className)}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => value && setActiveTab(value)}
      className={cn(
        "af-inline-flex af-items-center af-justify-center af-whitespace-nowrap af-rounded-md af-px-4 af-py-2 af-text-sm af-font-medium af-transition-all",
        "focus-visible:af-outline-none focus-visible:af-ring-2 focus-visible:af-ring-accent focus-visible:af-ring-offset-2 focus-visible:af-ring-offset-surface disabled:af-pointer-events-none disabled:af-opacity-50",
        isActive ? "af-bg-panel af-text-text-hi af-shadow-sm" : "hover:af-bg-white/5 hover:af-text-text-hi",
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';


const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== value) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn("af-mt-4 af-ring-offset-surface focus-visible:af-outline-none focus-visible:af-ring-2 focus-visible:af-ring-accent", className)}
      {...props}
    />
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };