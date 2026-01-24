import CalorieCard from "@/components/cards/CalorieCard";
import PageLayout from "@/components/PageLayout";
import { CalorieTargetDTO } from "@/domain/dtos/dtos";
import { useCalorieTarget } from "@/hooks/useCalorieTarget";
import { useServices } from "@/hooks/useServices";
import { FlatList } from "react-native";
import { Divider, List, Provider as PaperProvider } from "react-native-paper";

type Props = {
  targets: CalorieTargetDTO[];
};

function CalorieTargetsList({ targets }: Props) {
  const renderItem = ({ item }: { item: CalorieTargetDTO }) => (
    <>
      <List.Item
        title={item.isDefault ? "Domyślny plan" : "Plan niestandardowy"}
        description={`Kalorie: ${item.dailyCalories}, B: ${item.dailyProtein}g, W: ${item.dailyCarbs}g, T: ${item.dailyFat}g`}
        left={(props) =>
          item.isDefault ? <List.Icon {...props} icon="star" /> : null
        }
      />
      <Divider />
    </>
  );

  return (
    <FlatList
      data={targets}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
    />
  );
}

export default function AccountScreen() {
  const { accountService } = useServices();
  const { todayTarget, targets, defaultTarget } =
    useCalorieTarget(accountService);

  console.log(todayTarget);
  return (
    <PageLayout title="Account Settings" subtitle="Manage your nutrition goals">
      <CalorieCard
        image={require("../../assets/images/icons/home_icon.png")}
        calories={todayTarget?.dailyCalories}
        protein={todayTarget?.dailyProtein}
        fat={todayTarget?.dailyFat}
        carbs={todayTarget?.dailyCarbs}
      />
      <PaperProvider>
        <CalorieTargetsList targets={targets} />
      </PaperProvider>
    </PageLayout>
  );
}
