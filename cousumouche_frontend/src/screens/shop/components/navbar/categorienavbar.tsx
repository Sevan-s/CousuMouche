import { useEffect, useState } from "react"

interface categorie {
    name: string,
    status: boolean
};

interface subCategorie {
    name: string,
    status: boolean
};

interface CategoriesNavbarProps {
    selectedSubCat: string;
    onSubCatChange: (subCat: string) => void;
    selectedMomSubCat: string;
    onMomSubCatChange: (momSubCat: string) => void;
}

export default function CategoriesNavbar({
    selectedSubCat,
    onSubCatChange,
    selectedMomSubCat,
    onMomSubCatChange
}: CategoriesNavbarProps) {

    const [categories, setCategories] = useState<categorie[]>(() => {
        const saved = localStorage.getItem("categorie");
        return saved
            ? JSON.parse(saved)
            : [
                { name: "Tout", status: false },
                { name: "Enfant", status: false },
                { name: "Maman", status: false },
                { name: "Carte cadeau", status: false },
            ];
    });

    const catIndex = categories.findIndex((cat) => cat.status);

    const [subCategorie, setSubCategorie] = useState<subCategorie[]>([
        { name: "Tout", status: false },
        { name: "Dodo", status: false },
        { name: "Repas", status: false },
        { name: "Bain", status: false },
        { name: "Accessoires", status: false },
        { name: "Mode", status: false },
        { name: "Décoration", status: false },

    ]);

    const [momSubCategorie, setMomSubCategorie] = useState<subCategorie[]>([
        { name: "Tout", status: false },
        { name: "Maternité", status: false },
        { name: "Beauté", status: false },
        { name: "Accessoires", status: false },
        { name: "Mode", status: false },

    ]);

    const handleClick = (index: number) => {
        setCategories((prev) => prev.map((cat, i) => i === index ? { ...cat, status: true } : { ...cat, status: false }
        ))
        subCatHandleClick(0)
        momSubCatHandleClick(0)
    }


    const subCatHandleClick = (index: number) => {
        setSubCategorie((prev) => prev.map((subCat, i) => i === index ? { ...subCat, status: true } : { ...subCat, status: false }))
        onSubCatChange(subCategorie[index].name);
    }

    const momSubCatHandleClick = (index: number) => {
        setMomSubCategorie((prev) => prev.map((subCat, i) => i === index ? { ...subCat, status: true } : { ...subCat, status: false }))
        onMomSubCatChange(momSubCategorie[index].name);
    }


    useEffect(() => {
        localStorage.setItem("categorie", JSON.stringify(categories));
    }, [categories]);

    return (
        <div>
            <nav>
                <ul className="flex w-[40%] justify-center gap-10 mx-auto  items-center flex-row text-[#7E649D] font-poiret font-bold mt-5">
                    {categories.map((cat, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleClick(index)}
                                className={cat.status ? "text-[#d3c0e9] underline" : ""}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
                {catIndex !== -1 && categories[catIndex].name === "Enfant" &&
                    <ul className="flex w-[70%] justify-center gap-20 mx-auto items-center flex-row text-[#7E649D] font-poiret font-bold mt-5">
                        {subCategorie.map((subCat, index) => (
                            <li key={index}>
                                <button onClick={() => subCatHandleClick(index)} className={subCat.status ? "text-[#d3c0e9] underline" : ""}>
                                    {subCat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                }
                {catIndex !== -1 && categories[catIndex].name === "Maman" &&
                    <ul className="flex w-[50%] justify-center gap-20 mx-auto  items-center flex-row text-[#7E649D] font-poiret font-bold mt-5">
                        {momSubCategorie.map((momSubCat, index) => (
                            <li key={index}>
                                <button onClick={() => momSubCatHandleClick(index)} className={momSubCat.status ? "text-[#d3c0e9] underline" : ""}>
                                    {momSubCat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                }
            </nav>
        </div>
    )
}