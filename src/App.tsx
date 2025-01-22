import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { useState } from "react";

function App() {
  let ID = 0;

  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([
    { id: ID++, text: "" },
  ]);
  const [tasksMode, setTasksMode] = useState<string>("all");

  const handleChange = (id: number, text: string) => {
    const currentTask = tasks.filter((task) => task.id === id)[0];
    const cleanTasks = tasks.filter((task) => task.id !== id);

    currentTask.text = text;

    setTasks([...cleanTasks, currentTask]);
  };

  return (
    <div>
      <div className="flex justify-center m-4">
        <Input className="w-2/4" type="search" placeholder="Search"></Input>
      </div>

      <div className="m-4 space-x-2">
        <Button
          onClick={() => setTasksMode("all")}
          variant={tasksMode === "all" ? "outline" : "ghost"}
        >
          All
        </Button>
        <Button
          onClick={() => setTasksMode("active")}
          variant={tasksMode === "active" ? "outline" : "ghost"}
        >
          Active
        </Button>
        <Button
          onClick={() => setTasksMode("completed")}
          variant={tasksMode === "completed" ? "outline" : "ghost"}
        >
          Completed
        </Button>
      </div>

      {tasks.map((task) => (
        <div className="flex justify-between items-center m-6 w-1/4 space-x-2">
          <Checkbox></Checkbox>
          <Input
            onChange={(e) => handleChange(task.id, e.target.value)}
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
