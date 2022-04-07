package com.example.mainproject.StockPlatform;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.transition.AutoTransition;
import android.transition.TransitionManager;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.mainproject.R;

public class Financials extends AppCompatActivity {

    Button balanceSheet, incomeStatement,cashFlow, earnings;
    TextView sym;

    CardView balanceSheetcard;
    CardView incomeStatementcard;
    CardView cashflowcard;

    LinearLayout hidden1;
    ImageView arrow1;

    LinearLayout hidden2;
    ImageView arrow2;

    LinearLayout hidden3;
    ImageView arrow3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_financials);

        balanceSheet = findViewById(R.id.BalanceSheet);
        incomeStatement = findViewById(R.id.IncomeStatement);
        cashFlow = findViewById(R.id.CashFlow);
        earnings = findViewById(R.id.Earnings);

        balanceSheetcard = findViewById(R.id.BalanceSheetcard);
        incomeStatementcard = findViewById(R.id.incomeStatementcard);
        cashflowcard = findViewById(R.id.cashflowcard);

        hidden1 = findViewById(R.id.hidden1);
        hidden2 = findViewById(R.id.hidden2);
        hidden3 = findViewById(R.id.hidden3);

        arrow1 = findViewById(R.id.arrow1);
        arrow2 = findViewById(R.id.arrow2);
        arrow3 = findViewById(R.id.arrow3);



        sym = findViewById(R.id.symbol);

        Intent intent = getIntent();
        String str = intent.getStringExtra("message");
        sym.setText(str);

        arrow1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // If the CardView is already expanded, set its visibility
                //  to gone and change the expand less icon to expand more.
                if (hidden1.getVisibility() == View.VISIBLE) {

                    // The transition of the hiddenView is carried out
                    //  by the TransitionManager class.
                    // Here we use an object of the AutoTransition
                    // Class to create a default transition.
                    TransitionManager.beginDelayedTransition(balanceSheetcard,
                            new AutoTransition());
                    hidden1.setVisibility(View.GONE);
                    arrow1.setImageResource(R.drawable.ic_baseline_expand_more_24);
                }

                // If the CardView is not expanded, set its visibility
                // to visible and change the expand more icon to expand less.
                else {

                    TransitionManager.beginDelayedTransition(balanceSheetcard,
                            new AutoTransition());
                    hidden1.setVisibility(View.VISIBLE);
                    arrow1.setImageResource(R.drawable.ic_baseline_expand_less_24);
                }
            }
        });

        balanceSheetcard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BalanceSheet.class);
                intent.putExtra("message", str.toString());
                startActivity(intent);
            }
        });


        arrow1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // If the CardView is already expanded, set its visibility
                //  to gone and change the expand less icon to expand more.
                if (hidden1.getVisibility() == View.VISIBLE) {

                    // The transition of the hiddenView is carried out
                    //  by the TransitionManager class.
                    // Here we use an object of the AutoTransition
                    // Class to create a default transition.
                    TransitionManager.beginDelayedTransition(balanceSheetcard,
                            new AutoTransition());
                    hidden1.setVisibility(View.GONE);
                    arrow1.setImageResource(R.drawable.ic_baseline_expand_more_24);
                }

                // If the CardView is not expanded, set its visibility
                // to visible and change the expand more icon to expand less.
                else {

                    TransitionManager.beginDelayedTransition(balanceSheetcard,
                            new AutoTransition());
                    hidden1.setVisibility(View.VISIBLE);
                    arrow1.setImageResource(R.drawable.ic_baseline_expand_less_24);
                }
            }
        });

//        balanceSheetcard.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(getApplicationContext(), BalanceSheet.class);
//                intent.putExtra("message", str.toString());
//                startActivity(intent);
//            }
//        });





        arrow2.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.KITKAT)
            @Override
            public void onClick(View view) {


                if (hidden2.getVisibility() == View.VISIBLE) {


                    TransitionManager.beginDelayedTransition(incomeStatementcard,
                            new AutoTransition());
                    hidden2.setVisibility(View.GONE);
                    arrow2.setImageResource(R.drawable.ic_baseline_expand_more_24);
                }


                else {

                    TransitionManager.beginDelayedTransition(incomeStatementcard,
                            new AutoTransition());
                    hidden2.setVisibility(View.VISIBLE);
                    arrow2.setImageResource(R.drawable.ic_baseline_expand_less_24);
                }
            }
        });

        incomeStatementcard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), IncomeStatement.class);
                intent.putExtra("message", str.toString());
                startActivity(intent);
            }
        });



        arrow3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                if (hidden3.getVisibility() == View.VISIBLE) {


                    TransitionManager.beginDelayedTransition(cashflowcard,
                            new AutoTransition());
                    hidden3.setVisibility(View.GONE);
                    arrow3.setImageResource(R.drawable.ic_baseline_expand_more_24);
                }


                else {

                    TransitionManager.beginDelayedTransition(cashflowcard,
                            new AutoTransition());
                    hidden3.setVisibility(View.VISIBLE);
                    arrow3.setImageResource(R.drawable.ic_baseline_expand_less_24);
                }
            }
        });

        cashflowcard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), CashFlowStatement.class);
                intent.putExtra("message", str.toString());
                startActivity(intent);
            }
        });



        balanceSheet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BalanceSheet.class);
                intent.putExtra("message", str.toString());
                startActivity(intent);
            }
        });

        incomeStatement.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), IncomeStatement.class);
                intent.putExtra("message", str.toString());
                startActivity(intent);
            }
        });

        cashFlow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), CashFlowStatement.class);
                intent.putExtra("message", str.toString());
                startActivity(intent);
            }
        });


    }
}