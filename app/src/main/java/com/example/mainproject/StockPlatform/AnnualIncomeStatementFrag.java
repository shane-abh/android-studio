package com.example.mainproject.StockPlatform;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.example.mainproject.R;
import androidx.fragment.app.Fragment;


public class AnnualIncomeStatementFrag extends Fragment {



    public AnnualIncomeStatementFrag() {
        // Required empty public constructor
    }

   
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
       
        View view = inflater.inflate(R.layout.fragment_annual, container, false);

        WebView webView = view.findViewById(R.id.webview);

        webView.loadUrl("file:///android_asset/annualIncomeStatement.html");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        webView.getSettings().setAppCacheEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);

        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setDomStorageEnabled(true);

        String symbol = getArguments().getString("symbol");
        webView.setWebViewClient(new WebViewClient() {

            public void onPageFinished(WebView view, String url) {
                view.loadUrl("javascript:init('"+symbol.toString()+"')");
            }
        });
        
        return view;
    }
}