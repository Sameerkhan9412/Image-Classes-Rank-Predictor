import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Rule from "@/models/Rule";

// ❌ DELETE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const deleted = await Rule.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });

  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}


// ✏️ UPDATE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const body = await req.json();

    const updated = await Rule.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);

  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}