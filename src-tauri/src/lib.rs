#[tauri::command]
fn dark_mode(hora: String) -> Result<(), String> {
    let ruta_bat = std::env::current_exe()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("no se pudo resolver la carpeta")?
        .join("dark_mode-x86_64-pc-windows-msvc.EXE");

    let ruta_str = format!("\"{}\"", ruta_bat.to_str().ok_or("ruta inválida")?);

    std::process::Command::new("schtasks")
        .args([
            "/create",
            "/tn", "windThemesDarkModeTask",
            "/tr", &ruta_str,
            "/sc", "once",
            "/st", &hora,
            "/f", 
        ])
        .output()
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn light_mode(hora: String) -> Result<(), String> {
    let ruta_bat = std::env::current_exe()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("no se pudo resolver la carpeta")?
        .join("light_mode-x86_64-pc-windows-msvc.EXE");

    let ruta_str = format!("\"{}\"", ruta_bat.to_str().ok_or("ruta inválida")?);

    std::process::Command::new("schtasks")
        .args([
            "/create",
            "/tn", "windThemesLightModeTask",
            "/tr", &ruta_str,
            "/sc", "once",
            "/st", &hora,
            "/f", 
        ])
        .output()
        .map_err(|e| e.to_string())?;

    Ok(())
}




#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            dark_mode, 
            light_mode
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
