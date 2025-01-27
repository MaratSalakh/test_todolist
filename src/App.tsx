import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

function App() {
  const { setTheme } = useTheme();

  const [ID, setID] = useState<number>(0);
  const [tasks, setTasks] = useState<
    { id: number; text: string; active: boolean }[]
  >([]);
  const [tasksMode, setTasksMode] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");

  const handleChangeTask = (id: number, text: string) => {
    const currentTask = tasks.filter((task) => task.id === id)[0];
    const cleanTasks = tasks.filter((task) => task.id !== id);

    currentTask.text = text;

    setTasks([...cleanTasks, currentTask]);
  };

  const handleSubmitSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const newTask = { id: ID, text: searchText, active: true };

    setID(ID + 1);

    setTasks([...tasks, newTask]);

    setSearchText("");
  };

  const filterHandler = (task: {
    id: number;
    text: string;
    active: boolean;
  }) => {
    switch (tasksMode) {
      case "all":
        return true;
      case "active":
        return task.active === true;
      case "completed":
        return task.active === false;
    }
  };

  return (
    <div>
      <div className="flex justify-center m-4 space-x-2">
        <Input
          value={searchText}
          onKeyDown={(e) => handleSubmitSearch(e)}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-2/4"
          type="search"
          placeholder="Search"
        ></Input>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* control buttons */}
      <div className="space-x-2 m-4">
        <Button
          onClick={() => setTasksMode("all")}
          variant={tasksMode === "all" ? "default" : "secondary"}
        >
          All
        </Button>
        <Button
          onClick={() => setTasksMode("active")}
          variant={tasksMode === "active" ? "default" : "secondary"}
        >
          Active
        </Button>

        <Button
          onClick={() => setTasksMode("completed")}
          variant={tasksMode === "completed" ? "default" : "secondary"}
        >
          Completed
        </Button>
        <Button onClick={() => setTasks([])} variant={"secondary"}>
          Clear all
        </Button>
      </div>

      {/* list */}
      {tasks.filter(filterHandler).map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center m-6 w-1/4 space-x-2"
        >
          <Checkbox></Checkbox>
          <Input
            onChange={(e) => handleChangeTask(task.id, e.target.value)}
            type="text"
            placeholder="What needs to be done?"
            value={task.text}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
