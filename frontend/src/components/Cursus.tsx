export default function Cursus() {
  return (
    <>
      <div class="border-solid border-2 border-slate-500 m-20 grid grid-cols-2 justify-center">
        <div class="relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 to-slate-800 text-center">
          <h1 class="sticky top-0 ">Première colonne</h1>
        </div>
        <div class="grid grid-rows-4 justify-center">
          <div class="p-4 border-l-2 border-b-2 border-slate-500 h-full flex flex-col items-center">
            <h2>Première ligne</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              nesciunt, libero labore provident distinctio, soluta odit magni
              adipisci suscipit, commodi similique quas? Laboriosam nobis fugiat
              nisi accusantium sapiente quod ut.
            </p>
          </div>
          <div class="p-4 border-l-2 border-b-2 border-slate-500 h-full flex flex-col gap-2 items-center">
            <h2>Deuxième ligne</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              nesciunt, libero labore provident distinctio, soluta odit magni
              adipisci suscipit, commodi similique quas? Laboriosam nobis fugiat
              nisi accusantium sapiente quod ut.
            </p>
          </div>
          <div class="p-4 border-l-2 border-b-2 border-slate-500 h-full flex flex-col gap-2 items-center">
            <h2>Troisième ligne</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              nesciunt, libero labore provident distinctio, soluta odit magni
              adipisci suscipit, commodi similique quas? Laboriosam nobis fugiat
              nisi accusantium sapiente quod ut.
            </p>
          </div>
          <div class="p-4 border-l-2 border-b-2 border-slate-500 h-full flex flex-col gap-2 items-center">
            <h2>Quatrième ligne</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              nesciunt, libero labore provident distinctio, soluta odit magni
              adipisci suscipit, commodi similique quas? Laboriosam nobis fugiat
              nisi accusantium sapiente quod ut.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}