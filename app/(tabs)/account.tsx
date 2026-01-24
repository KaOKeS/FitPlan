import CalorieCard from "@/components/cards/CalorieCard";
import PageLayout from "@/components/PageLayout";

export default function AccountScreen() {
  return (
    <PageLayout title="Account Settings" subtitle="Manage your nutrition goals">
      <CalorieCard
        image={require("../../assets/images/icons/home_icon.png")}
        calories={200}
        protein={30}
        fat={20}
        carbs={30}
      />
    </PageLayout>
  );
}
