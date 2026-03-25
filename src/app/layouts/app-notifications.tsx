import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [];

type AppNotificationsProps = {
  notifications?: NotificationItem[];
};

export function AppNotifications({
  notifications = DEFAULT_NOTIFICATIONS,
}: AppNotificationsProps) {
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative rounded-full text-grey-100 hover:bg-neutral-200"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {unreadCount > 0 ? (
            <span className="absolute top-2 right-2 size-2 rounded-full bg-red-60" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-88 rounded-md border-grey-30 p-0"
      >
        <div className="flex items-center justify-between border-b border-grey-30 px-4 py-3">
          <div>
            <p className="text-base font-semibold text-grey-100">Notifikasi</p>
            <p className="text-sm text-grey-80">Aktivitas terbaru aplikasi</p>
          </div>

          {unreadCount > 0 ? (
            <Badge variant="red" className="rounded-full px-2 py-0.5">
              {unreadCount} baru
            </Badge>
          ) : null}
        </div>

        {notifications.length > 0 ? (
          <div className="max-h-80 overflow-y-auto py-1">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="items-start gap-3 rounded-none px-4 py-3 focus:bg-blue-10"
              >
                <span
                  className={`mt-1 size-2 shrink-0 rounded-full ${
                    notification.unread ? "bg-blue-50" : "bg-grey-40"
                  }`}
                />

                <div className="min-w-0 space-y-1">
                  <p className="text-base font-medium text-grey-100">
                    {notification.title}
                  </p>
                  <p className="text-sm leading-5 text-grey-80">
                    {notification.description}
                  </p>
                  <p className="text-[11px] text-grey-70">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-base font-medium text-grey-100">
              Belum ada notifikasi baru
            </p>
            <p className="mt-1 text-sm text-grey-80">
              Aktivitas sistem akan tampil di sini.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
