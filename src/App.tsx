import { useState } from "react";
import "./App.css";
import { confirm } from "@tauri-apps/plugin-dialog";
import { load } from "@tauri-apps/plugin-store";

function App() {
  const [formValue, setFormValue] = useState({
    dark: "",
    light: "",
  });

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const store = await load("store.json", { autoSave: false });
    const confirmation = await confirm("You are sure?", {
      title: "Tauri",
      kind: "warning",
    });

    await store.set("light-time", { value: formValue.light });
    await store.set("dark-time", { value: formValue.dark });

    if (confirmation) {
      await store.save();
      await confirm("Times saved succesfully", {
        title: "Tauri",
        kind: "info",
      });
    } else {
      await confirm("Times don't saved ", {
        title: "Tauri",
        kind: "info",
      });
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async () => {
    console.log(formValue);
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
        <button onClick={handleClick}>Save</button>
      </form>
    </>
  );
}

export default App;
