package com.example.mainproject.StockPlatform;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;
import com.example.mainproject.R;

public class RealTimePriceAlert extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_real_time_price_alert);

        WebView webView = findViewById(R.id.webview);
        //priceAlert works
        webView.loadUrl("file:///android_asset/select.html");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        webView.getSettings().setAppCacheEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);

        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");


    }
    public class WebAppInterface {
        Context mContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast) {
            String NOTIFICATION_CHANNEL_ID = "10001" ;
            String default_notification_channel_id = "default";
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                CharSequence name = "Shane";
                String description = "First notification";
                int importance = NotificationManager.IMPORTANCE_DEFAULT;
                NotificationChannel channel = new NotificationChannel(default_notification_channel_id, name, importance);
                channel.setDescription(description);
                // Register the channel with the system; you can't change the importance
                // or other notification behaviors after this
                NotificationManager notificationManager = getSystemService(NotificationManager.class);
                notificationManager.createNotificationChannel(channel);
            }

            Uri alarmSound =
                    RingtoneManager. getDefaultUri (RingtoneManager. TYPE_NOTIFICATION );
            MediaPlayer mp = MediaPlayer. create (getApplicationContext(), alarmSound);
            mp.start();
            NotificationCompat.Builder mBuilder =
                    new NotificationCompat.Builder(mContext, default_notification_channel_id )
                            .setSmallIcon(R.drawable.ic_launcher_foreground )
                            .setContentTitle( "Price Alert" )
                            .setContentText( toast ) ;
            NotificationManager mNotificationManager = (NotificationManager)
                    getSystemService(Context. NOTIFICATION_SERVICE );
            mNotificationManager.notify(( int ) System. currentTimeMillis () ,
                    mBuilder.build());
        }
    }
}