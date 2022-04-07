package com.example.mainproject.StockPlatform;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import com.example.mainproject.R;

public class TechnicalAnalysis extends AppCompatActivity {

    Button Technicals;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stock_page);

        Technicals = findViewById(R.id.technicals);

        Intent intent = getIntent();
        String stockSymbol = intent.getStringExtra("message");
        System.out.println(stockSymbol);

        WebView webView = findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/TechAnalysis.html");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        webView.getSettings().setAppCacheEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);


        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setDomStorageEnabled(true);

        webView.setWebViewClient(new WebViewClient() {

            public void onPageFinished(WebView view, String url) {
                view.loadUrl("javascript:init('"+stockSymbol.toString()+"')");
            }
        });
    }
}