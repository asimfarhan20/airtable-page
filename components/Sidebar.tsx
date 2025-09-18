import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  ScreenShare,
  Search,
  Settings,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import Image from "next/image";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
];

const below = [
  {
    title: "Shared",
    url: "#",
    icon: ScreenShare,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="max-w-60 border-r font-sans fixed top-0 left-0 h-screen z-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pt-2 md:pt-18 text-lg font-semibold">
            <Image src="/Airtable_Logo.png" width={100} height={100} alt="Logo" className="m-3 md:hidden" />
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center px-2 text-lg font-medium hover:bg-muted gap-2 hover:text-primary rounded-md group data-[state=open]:bg-muted"> 
              <Star />
                Starred
                <ChevronDown className="mx-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="flex items-center font-medium text-sm text-muted-foreground w-95 mt-1 mb-2">
            <Star width={100}/> your starred bases interfaces,and workspaces will appear here
            
              <SidebarGroupContent />
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="text-2xl font-semibold">
              {below.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex items-center px-2 text-lg font-medium hover:bg-muted gap-2 hover:text-primary rounded-md group data-[state=open]:bg-muted">
          <UsersRound />
            Workspaces
            <ChevronDown className="mx-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="flex items-center font-small text-sm text-muted-foreground justify-center  mt-1 mb-2 hover:group-hover/text-primary rounded-md w-95">
        <UsersRound width={100} className="m"/> <p>My First workspace</p>
          <SidebarGroupContent />
          
        </CollapsibleContent>
        <CollapsibleContent className="flex items-center font-small text-sm text-muted-foreground justify-center  mt-1 mb-2 hover:group-hover/text-primary rounded-md w-95">
        <UsersRound width={100} className="m"/> Workspace
          <SidebarGroupContent />
          
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
