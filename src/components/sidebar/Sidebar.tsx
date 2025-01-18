import { FileText, Settings } from "lucide-react";
import { Button } from "../ui/button";

function Sidebar() {
  return (
    <aside className="w-64 border-r bg-zinc-100 h-screen p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">My Notes</h2>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          All Notes
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  );
}

export default Sidebar;
