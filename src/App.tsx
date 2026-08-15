import { useState } from "react";
import "./App.css";
import { confirm } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [formValue, setFormValue] = useState({
    dark: "",
    light: "",
  });

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {

      const confirmation = await confirm("You are sure?", {
        title: "Tauri",
        kind: "warning",
      });

      if (!confirmation) {
        await confirm("Times don't saved", {
          title: "Tauri",
          kind: "info",
        });
        return;
      }
      await invoke("light_mode", { hora: formValue.light });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1>windThemes</h1>
      <p>Select time for your themes</p>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="light-time">Light</label>

          <input
            name="light"
            type="time"
            id="light-time"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dark-time">Dark</label>

          <input
            name="dark"
            type="time"
            id="dark-time"
            onChange={handleChange}
          />
        </div>
        <button>Save</button>
      </form>
    </>
  );
}

export default App;
