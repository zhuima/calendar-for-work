import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "值班排班系统",
  description:
    "值班排班系统，用于值班人员排班，值班人员值班日历，值班人员值班表，值班人员值班安排，值班人员值班管理，值班人员值班安排表，值班人员值班安排日历，值班人员值班安排表格，值班人员值班安排表",
  keywords: [
    "值班",
    "排班",
    "值班表",
    "值班日历",
    "值班安排",
    "值班管理",
    "值班安排表",
    "值班安排日历",
    "值班安排表格",
    "值班安排表",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
