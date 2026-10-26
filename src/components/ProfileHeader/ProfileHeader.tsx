import ProfileAvatar from "./ProfileAvatar";
import NameFields from "./NameFields";
import DateFields from "./DateFields";
import LocationField from "./LocationField";
import ProfileTabs from "./ProfileTabs";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type ProfileForm = {
  first: string;
  middle: string;
  last: string;
  birth: string;
  expiry: string;
  location: string;
};

const EMPTY_FORM: ProfileForm = {
  first: "",
  middle: "",
  last: "",
  birth: "",
  expiry: "",
  location: "",
};

export default function ProfileHeader() {
  const [form, setForm] = useLocalStorage<ProfileForm>("profile-form", EMPTY_FORM);
  const [activeTab, setActiveTab] = useLocalStorage<string>("profile-active-tab", "story");

  const set = (key: keyof ProfileForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="px-4">
      <div className="mx-auto flex max-w-[980px] flex-wrap gap-8">
        <div className="-mt-16">
          <ProfileAvatar />
        </div>

        <div className="space-y-5 pt-6">
          <NameFields
            values={{ first: form.first, middle: form.middle, last: form.last }}
            onChange={(key, value) => set(key)(value)}
          />
          <DateFields
            birth={form.birth}
            expiry={form.expiry}
            onBirthChange={set("birth")}
            onExpiryChange={set("expiry")}
          />
          <LocationField value={form.location} onChange={set("location")} />
        </div>
      </div>

      <ProfileTabs active={activeTab} onChange={setActiveTab} />
    </section>
  );
}