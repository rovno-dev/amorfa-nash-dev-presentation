"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/ui/container";
import { $fetch } from "@/utils/fetch";

interface Note {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function load() {
    setLoading(true);
    const { response, json } = await $fetch("/api/v1/notes", { isToast: false });
    if (!response?.ok) {
      toast.error("Failed to load notes");
      setLoading(false);
      return;
    }
    setNotes(json ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    const { response, json } = await $fetch("/api/v1/notes", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
      isToast: false,
    });
    setSubmitting(false);
    if (!response?.ok) {
      toast.error("Failed to create note");
      return;
    }
    toast.success("Note created");
    setTitle("");
    setBody("");
    setNotes((prev) => [json, ...prev]);
  }

  async function handleDelete(id: string) {
    const { response } = await $fetch(`/api/v1/notes/${id}`, {
      method: "DELETE",
      isToast: false,
    });
    if (!response?.ok) {
      toast.error("Failed to delete");
      return;
    }
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <Container className="py-12 md:py-16">
      <h1 className="text-display-2 mb-8">Notes</h1>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>New note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
            />
            <Textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={10000}
              rows={4}
            />
            <Button type="submit" disabled={submitting || !title.trim()}>
              {submitting ? "Saving…" : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && <p className="text-(--on-bg-medium)">Loading…</p>}
      {!loading && notes.length === 0 && (
        <p className="text-(--on-bg-medium)">No notes yet.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 flex-1">
              <p className="text-sm text-(--on-bg-medium) line-clamp-4 whitespace-pre-wrap">
                {note.body || "—"}
              </p>
              <div className="mt-auto flex justify-between items-center">
                <time className="text-xs text-(--on-bg-low)">
                  {new Date(note.created_at).toLocaleDateString()}
                </time>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
