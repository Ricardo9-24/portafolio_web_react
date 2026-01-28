import { useEffect, useState } from "react";

const DarkMode = () => {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark])

    const changeTheme = () => {
        const newTheme = !dark;
        setDark(newTheme);
        localStorage.setItem("theme", newTheme ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    }

    return (
        <>
            <button
                onClick={() => changeTheme()}
            >{dark ? 'Tema Claro' : 'Tema Oscuro'}</button>
            {/* <input
                type="checkbox"
                checked={dark}
                onChange={changeTheme}
                defaultChecked={dark}
            />
            {dark ? '🌙 Oscuro' : '☀️ Claro'} */}
        </>
    )
}

export default DarkMode