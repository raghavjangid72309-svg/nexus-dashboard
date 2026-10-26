
"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  category: string;
  done: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Practice Python", category: "LEARNING", done: false },
    { id: 2, title: "Build portfolio UI", category: "DEVELOPMENT", done: true },
    { id: 3, title: "Review college notes", category: "STUDY", done: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [clock, setClock] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };

    updateClock();
    const clockInterval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          setSessions((previous) => previous + 1);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTask.trim()) return;

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: newTask.trim(),
        category: "PERSONAL",
        done: false,
      },
    ]);

    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function resetTimer() {
    setRunning(false);
    setSeconds(25 * 60);
  }

  return (
    <main className="nexus relative min-h-screen overflow-hidden bg-[#09090d] text-white selection:bg-violet-500/30">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap");

        .nexus {
          font-family: "DM Sans", sans-serif;
          isolation: isolate;
        }

        .nexus h1,
        .nexus h2,
        .nexus h3,
        .nexus .display-font {
          font-family: "Space Grotesk", sans-serif;
        }

        .nexus-grid {
          background-image:
            linear-gradient(#a78bfa0b 1px, transparent 1px),
            linear-gradient(90deg, #a78bfa0b 1px, transparent 1px);
          background-size: 52px 52px;
          animation: nexus-grid 30s linear infinite;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }

        .nexus-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          animation: nexus-float 12s ease-in-out infinite alternate;
        }

        .nexus-orb-two {
          animation-delay: -5s;
          animation-duration: 16s;
        }

        .nexus-entrance {
          opacity: 0;
          animation: nexus-enter 0.8s cubic-bezier(.2,.8,.2,1) forwards;
        }

        .nexus-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            transform .35s cubic-bezier(.2,.8,.2,1),
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .nexus-card:hover {
          transform: translateY(-5px);
          border-color: #a78bfa50;
          box-shadow: 0 15px 45px #0005, 0 0 30px #8b5cf610;
        }

        .nexus-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            #a78bfa12,
            transparent 55%
          );
          transition: opacity .3s ease;
        }

        .nexus-card:hover::before {
          opacity: 1;
        }

        .nexus-gradient {
          background: linear-gradient(
            100deg,
            #c4b5fd,
            #818cf8,
            #5eead4,
            #c4b5fd
          );
          background-size: 300% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: nexus-gradient 7s linear infinite;
        }

        .nexus-shimmer {
          position: relative;
          overflow: hidden;
        }

        .nexus-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(
            110deg,
            transparent 25%,
            #ffffff0c 50%,
            transparent 75%
          );
          animation: nexus-shimmer 7s ease-in-out infinite;
          pointer-events: none;
        }

        .nexus-progress {
          transition: width .7s cubic-bezier(.2,.8,.2,1);
        }

        .nexus-task {
          animation: nexus-task-in .35s ease both;
        }

        .nexus-button {
          transition: transform .2s ease, filter .2s ease;
        }

        .nexus-button:hover {
          filter: brightness(1.12);
          transform: translateY(-2px);
        }

        .nexus-button:active {
          transform: scale(.97);
        }

        .nexus-dot {
          animation: nexus-blink 2s ease-in-out infinite;
        }

        .nexus-timer-ring {
          transform: rotate(-90deg);
        }

        @keyframes nexus-enter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes nexus-task-in {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes nexus-float {
          from {
            transform: translate3d(0, -20px, 0) scale(.9);
          }
          to {
            transform: translate3d(50px, 60px, 0) scale(1.15);
          }
        }

        @keyframes nexus-grid {
          to {
            background-position: 52px 52px;
          }
        }

        @keyframes nexus-gradient {
          to {
            background-position: 300% center;
          }
        }

        @keyframes nexus-shimmer {
          0%, 70%, 100% {
            transform: translateX(-120%);
          }
          85% {
            transform: translateX(120%);
          }
        }

        @keyframes nexus-blink {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px #5eead455;
          }
          50% {
            opacity: .45;
            box-shadow: 0 0 2px #5eead400;
          }
        }

        .nexus ::-webkit-scrollbar {
          width: 6px;
        }

        .nexus ::-webkit-scrollbar-thumb {
          background: #393044;
          border-radius: 10px;
        }

        @media (prefers-reduced-motion: reduce) {
          .nexus *,
          .nexus *::before,
          .nexus *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* Animated atmosphere */}
      <div className="nexus-grid pointer-events-none fixed inset-0 -z-10" />
      <div className="nexus-orb left-[-180px] top-[180px] -z-10 h-[360px] w-[360px] bg-violet-600/20" />
      <div className="nexus-orb nexus-orb-two right-[-200px] top-[650px] -z-10 h-[400px] w-[400px] bg-cyan-500/10" />

      {/* Header */}
      <header className="nexus-entrance mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-500/15 text-xl font-bold text-violet-200">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-transparent" />
            <span className="relative">N.</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-[.24em]">NEXUS</h1>
            <p className="mt-0.5 text-[9px] tracking-[.22em] text-zinc-500">
              PERSONAL WORKSPACE
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a className="text-white transition hover:text-violet-300" href="#overview">
            Overview
          </a>
          <a className="transition hover:text-violet-300" href="#tasks">
            My tasks
          </a>
          <a className="transition hover:text-violet-300" href="#focus">
            Focus room
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/[.08] bg-white/[.03] px-3 py-2 sm:flex">
            <span className="nexus-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-zinc-400">SYSTEM ONLINE</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/20 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-sm font-semibold">
            R
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8 lg:px-12">
        {/* Welcome section */}
        <section
          id="overview"
          className="nexus-entrance mb-6 flex flex-wrap items-end justify-between gap-4"
          style={{ animationDelay: ".08s" }}
        >
          <div>
            <p className="mb-2 text-xs tracking-[.22em] text-violet-300">
              YOUR SPACE. YOUR PACE.
            </p>
            <h2 className="display-font text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back<span className="text-violet-300">.</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              One step at a time. Let&apos;s make it count.
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-medium tabular-nums text-zinc-200">
              {mounted ? clock : "--:--"}
            </p>
            <p className="mt-1 text-[10px] tracking-[.15em] text-zinc-500">
              YOUR LOCAL TIME
            </p>
          </div>
        </section>

        {/* Main Bento hero */}
        <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div
            className="nexus-card nexus-shimmer nexus-entrance group rounded-[28px] border border-violet-300/[.12] bg-gradient-to-br from-[#211a35] via-[#171420] to-[#101016] p-7 sm:p-10 lg:col-span-2"
            style={{ animationDelay: ".14s" }}
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px] transition duration-700 group-hover:bg-violet-400/25" />

            <div className="relative flex min-h-[300px] flex-col justify-between sm:min-h-[320px]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[.07] px-3 py-1.5 text-[10px] tracking-[.16em] text-violet-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                  YOUR PRODUCTIVITY SPACE
                </span>

                <h2 className="display-font mt-8 text-5xl font-semibold leading-[1.05] tracking-[-.055em] sm:text-7xl">
                  Make today
                  <br />
                  <span className="nexus-gradient">count.</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
                  Create space for what matters. Focus on the work, trust the
                  process, and let the little wins add up.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#tasks"
                  className="nexus-button inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
                >
                  Explore your day <span>↗</span>
                </a>
                <span className="text-xs text-zinc-500">
                  Designed for deep work
                </span>
              </div>
            </div>
          </div>

          {/* Progress card */}
          <div
            className="nexus-card nexus-entrance flex flex-col justify-between rounded-[28px] border border-white/[.08] bg-[#121218]/90 p-6 sm:p-8"
            style={{ animationDelay: ".22s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Daily progress</p>
                <p className="mt-1 text-xs text-zinc-600">Your day, in motion</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-400/[.08] text-lg text-violet-300">
                ◈
              </span>
            </div>

            <div className="my-8 flex items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#ffffff0b"
                    strokeWidth="7"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="url(#nexusRing)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${(progress / 100) * 427.26} 427.26`}
                    className="nexus-progress"
                  />
                  <defs>
                    <linearGradient id="nexusRing">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#5eead4" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="text-center">
                  <p className="display-font text-4xl font-semibold">
                    {progress}
                    <span className="text-xl text-violet-300">%</span>
                  </p>
                  <p className="mt-1 text-[10px] tracking-[.16em] text-zinc-500">
                    COMPLETED
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 flex justify-between text-xs">
                <span className="text-zinc-400">Tasks finished</span>
                <span className="text-zinc-200">
                  {completed} / {tasks.length}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                <div
                  className="nexus-progress h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                {progress === 100 && tasks.length > 0
                  ? "Everything done. Excellent work!"
                  : "Every completed task moves you forward."}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bento row */}
        <section className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="nexus-card nexus-entrance rounded-[24px] border border-white/[.07] bg-[#121218]/90 p-5 sm:p-6"
            style={{ animationDelay: ".28s" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wide text-zinc-400">
                TASKS COMPLETED
              </span>
              <span className="text-lg text-violet-300">✓</span>
            </div>
            <p className="display-font mt-6 text-4xl font-semibold">
              {String(completed).padStart(2, "0")}
              <span className="text-lg text-zinc-600">
                {" "}
                / {String(tasks.length).padStart(2, "0")}
              </span>
            </p>
            <p className="mt-2 text-xs text-zinc-500">Your daily checklist</p>
          </div>

          <div
            className="nexus-card nexus-entrance rounded-[24px] border border-emerald-300/[.10] bg-[#101916] p-5 sm:p-6"
            style={{ animationDelay: ".34s" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wide text-zinc-400">
                FOCUS SESSIONS
              </span>
              <span className="text-lg text-emerald-300">◷</span>
            </div>
            <p className="display-font mt-6 text-4xl font-semibold">
              {String(sessions).padStart(2, "0")}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Completed timer sessions
            </p>
          </div>

          {/* Timer */}
          <div
            id="focus"
            className="nexus-card nexus-entrance rounded-[24px] border border-cyan-300/[.10] bg-[#101719] p-5 sm:p-6"
            style={{ animationDelay: ".40s" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wide text-zinc-400">
                FOCUS ROOM
              </span>
              <span className="nexus-dot h-2 w-2 rounded-full bg-cyan-300" />
            </div>

            <p className="display-font mt-5 text-4xl font-medium tabular-nums tracking-tight">
              {time}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  if (seconds === 0) {
                    setSeconds(25 * 60);
                    setRunning(true);
                  } else {
                    setRunning((value) => !value);
                  }
                }}
                className="nexus-button rounded-lg bg-cyan-200 px-3 py-2 text-xs font-semibold text-[#071211]"
              >
                {running ? "Pause" : seconds === 0 ? "Start again" : "▶ Start"}
              </button>

              <button
                onClick={resetTimer}
                className="nexus-button rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300 hover:bg-white/[.05]"
              >
                Reset
              </button>
            </div>
          </div>

          <div
            className="nexus-card nexus-entrance rounded-[24px] border border-white/[.07] bg-[#121218]/90 p-5 sm:p-6"
            style={{ animationDelay: ".46s" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wide text-zinc-400">
                DAILY INTENTION
              </span>
              <span className="text-lg text-amber-300">✳</span>
            </div>
            <p className="display-font mt-6 text-2xl font-medium leading-tight">
              Less noise.
              <br />
              <span className="text-amber-200">More focus.</span>
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              One thing at a time.
            </p>
          </div>
        </section>

        {/* Tasks and method */}
        <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <div
            id="tasks"
            className="nexus-card nexus-entrance rounded-[28px] border border-white/[.07] bg-[#121218]/95 p-5 sm:p-7 lg:col-span-2"
            style={{ animationDelay: ".5s" }}
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[.2em] text-violet-300">
                  THE ACTION BOARD
                </p>
                <h2 className="display-font mt-2 text-2xl font-semibold">
                  Today&apos;s priorities
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Small actions. Meaningful progress.
                </p>
              </div>
              <span className="rounded-full border border-white/[.08] bg-white/[.03] px-3 py-1.5 text-xs text-zinc-400">
                {tasks.length} tasks
              </span>
            </div>

            <form onSubmit={addTask} className="mb-5 flex gap-2">
              <input
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="What do you want to get done?"
                aria-label="New task"
                className="min-w-0 flex-1 rounded-xl border border-white/[.08] bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10"
              />
              <button
                type="submit"
                className="nexus-button rounded-xl bg-violet-400 px-4 py-3 text-sm font-semibold text-[#100b19]"
              >
                + Add
              </button>
            </form>

            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="nexus-task group flex items-center gap-3 rounded-2xl border border-white/[.04] bg-white/[.02] p-4 transition hover:border-violet-300/20 hover:bg-white/[.04] sm:gap-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-label={
                      task.done
                        ? `Mark ${task.title} incomplete`
                        : `Complete ${task.title}`
                    }
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                      task.done
                        ? "border-violet-400 bg-violet-400 text-[#100b19]"
                        : "border-zinc-600 text-transparent hover:border-violet-300"
                    }`}
                  >
                    ✓
                  </button>

                  <button
                    onClick={() => toggleTask(task.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span
                      className={`block truncate text-sm font-medium transition ${
                        task.done
                          ? "text-zinc-500 line-through"
                          : "text-zinc-200"
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="mt-1 block text-[9px] tracking-[.14em] text-zinc-600">
                      {task.category}
                    </span>
                  </button>

                  <span
                    className={`hidden rounded-full px-2 py-1 text-[9px] tracking-wide sm:block ${
                      task.done
                        ? "bg-emerald-400/[.08] text-emerald-300"
                        : "bg-violet-400/[.08] text-violet-300"
                    }`}
                  >
                    {task.done ? "COMPLETED" : "IN PROGRESS"}
                  </span>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center">
                  <p className="text-sm text-zinc-400">Your board is clear.</p>
                  <p className="mt-2 text-xs text-zinc-600">
                    Add a task above to get started.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Focus guide */}
          <aside
            className="nexus-card nexus-entrance rounded-[28px] border border-white/[.07] bg-gradient-to-b from-[#191525] to-[#111116] p-6 sm:p-7"
            style={{ animationDelay: ".56s" }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-400/10 text-xl text-violet-300">
              ✳
            </div>

            <p className="mt-6 text-[10px] tracking-[.2em] text-violet-300">
              THE NEXUS METHOD
            </p>
            <h2 className="display-font mt-3 text-3xl font-semibold leading-tight">
              Progress over perfection.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Give your attention to one thing. You don&apos;t have to do
              everything at once.
            </p>

            <div className="my-7 h-px bg-white/[.07]" />

            {[
              ["01", "Pick one priority", "Make it specific."],
              ["02", "Focus for 25 minutes", "Give it your attention."],
              ["03", "Take a short break", "Reset and continue."],
            ].map(([number, title, subtitle]) => (
              <div key={number} className="mb-6 flex gap-3 last:mb-0">
                <span className="display-font pt-0.5 text-xs text-violet-300">
                  {number}
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
                </div>
              </div>
            ))}

            <a
              href="#focus"
              className="nexus-button mt-7 flex items-center justify-between rounded-xl border border-violet-300/15 bg-violet-300/[.06] p-4 text-sm text-violet-200 hover:bg-violet-300/[.12]"
            >
              Enter focus room <span>↗</span>
            </a>
          </aside>
        </section>

        <footer
          className="nexus-entrance mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[.07] py-6 text-[10px] tracking-[.13em] text-zinc-600"
          style={{ animationDelay: ".62s" }}
        >
          <span>© 2026 NEXUS WORKSPACE</span>
          <span className="flex items-center gap-2">
            <span className="nexus-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            BUILT FOR BETTER FOCUS
          </span>
        </footer>
      </div>
    </main>
  );
}
