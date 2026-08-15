# windThemes

---

A simple app to automatically change themes on windows

## Instalation in windows

---

### Requriments

1. System Dependencies
   1.1 Install  [Visual Studio Community](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Stable&version=VS18&source=VSLandingPage&cid=2500&passive=false) here!
   ![Image example](./public/img-system-dependencies.webp)
   
3. Rust
```shell
winget install --id Rustlang.Rustup    # install rust
rustup default stable-msvc

```

## Run

```shell
git clone https://github.com/sabuthess/windThemes.git

cd windThemes

bun install    # install packege.json dependencies

bun tauri dev    # run project

```
