package com.example.mainproject.StockPlatform;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import com.example.mainproject.R;

public class StockPage extends AppCompatActivity {

    Button financials,portfolio;
    Button Technicals;
    public DrawerLayout drawerLayout;
    public ActionBarDrawerToggle actionBarDrawerToggle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stock_page);

        Technicals = findViewById(R.id.technicals);
        portfolio = findViewById(R.id.Portfolio);

        drawerLayout = findViewById(R.id.my_drawer_layout);
        actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.nav_open, R.string.nav_close);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);



        Intent intent = getIntent();
        String stockSymbol = intent.getStringExtra("message");
        System.out.println(stockSymbol);

        WebView webView = findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/stockPage.html");

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
                view.loadUrl("javascript:sete('"+stockSymbol.toString()+"')");
            }
        });

        financials = findViewById(R.id.Financials);

        financials.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String symbol = stockSymbol;
                Intent intent = new Intent(getApplicationContext(), Financials.class);
                intent.putExtra("message", symbol.toString());
                startActivity(intent);
            }
        });

        portfolio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MyPortfolio.class);
                startActivity(intent);
            }
        });



        Technicals.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String symbol = stockSymbol;
                Intent intent = new Intent(getApplicationContext(), TechnicalAnalysis.class);
                intent.putExtra("message", symbol.toString());
                startActivity(intent);
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        if (actionBarDrawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}