package com.example.mainproject.PaymentReminder;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Timer;
import java.util.TimerTask;
import com.example.mainproject.R;

public class Ringing extends AppCompatActivity {

    private final String TAG = "Ringing";

    private class PlayTimerTask extends TimerTask
    {
        @Override
        public void run()
        {
            Log.d(TAG, "PalyTimerTask.run()");
            addNotification(task);
            finish();
        }
    }

    private Ringtone ringtone;
    private long playTime;
    private Timer timer = null;
    private PlayTimerTask playTimerTask;

    com.example.mainproject.PaymentReminder.Task task;
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.i(TAG, "onCreate");
        super.onCreate(savedInstanceState);

        getWindow().addFlags(
                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                        WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);

        setContentView(R.layout.ringing);

        textView = (TextView)findViewById(R.id.name);

        playTime = (long)30000;

        ringtone = RingtoneManager.getRingtone(getApplicationContext(), Settings.System.DEFAULT_NOTIFICATION_URI);

        start(getIntent());
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        stop();
    }

    private void start(Intent intent)
    {
        Log.d(TAG, "Start ringing...");

        task = new com.example.mainproject.PaymentReminder.Task();
        task.fromIntent(intent);

        Toast.makeText(getApplicationContext(),String.valueOf(task.getDate()),Toast.LENGTH_SHORT).show();

        textView.setText(task.getName());

        playTimerTask = new PlayTimerTask();
        timer = new Timer();
        timer.schedule(playTimerTask, playTime);
        ringtone.play();
    }

    private void stop()
    {
        Log.d(TAG, "Stop ringing...");
        timer.cancel();
        ringtone.stop();
    }

    public void onDismissClick(View view)
    {
        finish();
    }

    @Override
    public void onBackPressed() {
        finish();
    }

    private void addNotification(com.example.mainproject.PaymentReminder.Task task)
    {
        NotificationManager notificationManager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
        Notification notification;
        PendingIntent activity;
        Intent intent;

        Log.i(TAG, "adding notification...");

        intent = new Intent(this.getApplicationContext(), com.example.mainproject.PaymentReminder.DashBoardActivity.class);
        intent.setAction(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);

        activity = PendingIntent.getActivity(this, (int)task.getId(), intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationChannel channel = new NotificationChannel("alarmme_01", "AlarmMe Notifications",
                NotificationManager.IMPORTANCE_DEFAULT);

        notification = new Notification.Builder(this)
                .setContentIntent(activity)
                .setSmallIcon(R.drawable.ringing)
                .setAutoCancel(true)
                .setContentTitle("Missed reminder: " + task.getName())
                .setContentText(com.example.mainproject.PaymentReminder.DAO.formatDate(task))
                .setChannelId("alarmme_01")
                .build();

        notificationManager.createNotificationChannel(channel);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "alarmme_01";
            String description = "AlarmMe Notifications";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            channel = new NotificationChannel("alarmme_01", name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

        notificationManager.notify((int)task.getId(), notification);

        Log.d(TAG, "notification added");
    }
}