import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#ffffff",
  text: "#0b2545",
  accent: "#2c5870",
  inputBorder: "rgba(0,0,0,0.08)",
};

export const darkTheme = {
  body: "#0b2738",
  text: "#ffffff",
  accent: "#234a5f",
  inputBorder: "rgba(255,255,255,0.08)",
};

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: ${({ theme }) => theme.body};
    --text: ${({ theme }) => theme.text};
    --accent: ${({ theme }) => theme.accent};
  }

  body{
    background: var(--bg);
    color: var(--text);
    // transition: background .05s ease, color .25s ease;
  }

  input, textarea, button{
    color: var(--text);
        // transition: background .05s ease, color .25s ease;
  }
    .nav-link{
      color: var(--white);
        //  transition: background .05s ease, color .25s ease;

      &:hover{
        color: darken(var(--accent), 10%);
      }
    }
  `;
