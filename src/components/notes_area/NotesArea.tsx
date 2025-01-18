import { useState } from "react";
import Sidebar from "../sidebar/Sidebar"
import { Input } from "../ui/input"
import { NoteContext } from "../../utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Plus } from "lucide-react";

type FormValues = {
  name: string;
  description: string;
};

function NotesArea() {
    const [noteID, setNoteID] = useState<number>();
    const { register, handleSubmit, reset, setValue } = useForm<FormValues>();
    const [notes, setNotes] = useState<NoteContext[]>(() => {
      const savedNotes = window.localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    });
  
    const formSubmit = (data: FormValues) => {
      const newNote: NoteContext = {
        id: notes[notes.length - 1]?.id ? notes[notes.length - 1].id + 1 : 1,
        name: data.name,
        description: data.description,
        date: Date.now(),
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      reset();
      toast.success("Note added successfully!");
    };
  
    const deleteNote = (id: number) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully!");
    };
  
    window.localStorage.setItem("notes", JSON.stringify(notes));
  
    const editNote = (data: FormValues) => {
      const updatedNotes = notes.map((note) => {
        if (note.id === noteID) {
          return {
            ...note,
            name: data.name,
            description: data.description,
          };
        }
        return note;
      });
      setNotes(updatedNotes);
      toast.success("Note updated successfully!");
    };
  
    const handleEditClick = (note: NoteContext) => {
      setNoteID(note.id);
      setValue("name", note.name);
      setValue("description", note.description);
    };
  return (
    <main className="flex w-full h-screen overflow-hidden">
    <Sidebar />
    <div className="w-full">
      <header className="py-3 px-5 w-full h-fit flex justify-between border-b">
        <h1 className="text-3xl font-bold">Notes</h1>
        <Input placeholder="Search notes..." className="w-[30vw]" />
      </header>
      <div className="grid grid-cols-3 gap-5 m-10">
        {notes &&
          notes.map((note) => (
            <div
              key={note.id}
              className="border group rounded-md h-full flex flex-col justify-between p-5 shadow-md "
            >
              <div className="flex flex-col gap-10">
                <p className="text-2xl font-bold">{note.name}</p>
                <span>{note.description}</span>
              </div>
              <div className="flex items-center gap-3 transition-all opacity-0 group-hover:opacity-100 mt-2">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      size={"sm"}
                      variant={`destructive`}
                      className="w-fit bg-red-500  hover:bg-red-500/90 "
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your note and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteNote(note.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleEditClick(note)}
                      size={"sm"}
                      className="w-fit bg-green-500  hover:bg-green-500/90 "
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Note</DialogTitle>
                      <DialogDescription>
                        Update the inputs to edit the note
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      action=""
                      onSubmit={handleSubmit(editNote)}
                      className="grid gap-4 py-4"
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor="name" className="text-right">
                          Note's Name
                        </Label>
                        <Input {...register("name")} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor="description" className="text-right">
                          Note's Context
                        </Label>
                        <Textarea
                          rows={3}
                          {...register("description")}
                          className="col-span-3 resize-none"
                        />
                      </div>

                      <DialogClose asChild>
                        <Button type="submit">Update Note</Button>
                      </DialogClose>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
      </div>
    </div>
    {/* add note */}
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black fixed bottom-5 right-5 rounded-full size-10">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
          <DialogDescription>
            Fill the inputs to create a new note
          </DialogDescription>
        </DialogHeader>
        <form
          action=""
          onSubmit={handleSubmit(formSubmit)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Note's Name
            </Label>
            <Input {...register("name")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right">
              Note's Context
            </Label>
            <Textarea
              rows={3}
              {...register("description")}
              className="col-span-3 resize-none"
            />
          </div>

          <DialogClose asChild>
            <Button type="submit">Add Note</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  </main>
  )
}

export default NotesArea